import { AnchorProvider } from '@project-serum/anchor';
import { Connection, Keypair } from '@solana/web3.js';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  AnchorWallet,
  CreateQueueOracleParams,
  LoadedSwitchboardNetwork,
  NetworkInitParams,
  OracleAccount,
  QueueAccount,
  READ_ONLY_KEYPAIR,
  SwitchboardNetwork,
  SwitchboardProgram,
} from '..';
import { SolanaDockerOracle } from '../SolanaDockerOracle';

export function findAnchorTomlWallet(workingDir = process.cwd()): string {
  let numDirs = 3;
  while (numDirs) {
    const filePath = path.join(workingDir, 'Anchor.toml');
    if (fs.existsSync(filePath)) {
      const fileString = fs.readFileSync(filePath, 'utf-8');
      const matches = Array.from(
        fileString.matchAll(new RegExp(/wallet = "(?<wallet_path>.*)"/g))
      );
      if (
        matches &&
        matches.length > 0 &&
        'groups' in matches[0] &&
        'wallet_path' in matches[0].groups! &&
        matches[0].groups['wallet_path']
      ) {
        const walletPath = matches[0].groups['wallet_path'];
        return walletPath.startsWith('/') ||
          walletPath.startsWith('C:') ||
          walletPath.startsWith('D:')
          ? walletPath
          : walletPath.startsWith('~')
          ? path.join(os.homedir(), walletPath.slice(1))
          : path.join(process.cwd(), walletPath);
      }
    }

    workingDir = path.dirname(workingDir);
    --numDirs;
  }

  throw new Error(`Failed to find wallet path in Anchor.toml`);
}

export type SwitchboardTestContextV2Init = Omit<
  Omit<NetworkInitParams, 'authority'>,
  'oracles'
> & {
  oracle: Omit<CreateQueueOracleParams, 'authority'>;
};

// queuePubkey: ACzh7Ra83zyjyBn1yv4JLZ1jC41kxTcMyuoFN8z1BTPX
// oraclePubkey: Ei4HcqRQtf6TfwbuRXKRwCtt8PDXhmq9NhYLWpoh23xp

// TIP: Do NOT define an authority and defaul to Anchor.toml wallet
export const DEFAULT_LOCALNET_NETWORK: SwitchboardTestContextV2Init = {
  name: 'Localnet Queue',
  metadata: 'Localnet Metadata',
  keypair: Keypair.fromSecretKey(
    new Uint8Array([
      64, 119, 125, 66, 195, 41, 127, 56, 113, 141, 220, 226, 61, 141, 93, 213,
      149, 12, 201, 99, 225, 48, 92, 168, 203, 19, 197, 43, 186, 24, 189, 98,
      136, 203, 205, 164, 226, 1, 86, 171, 199, 229, 92, 106, 212, 230, 63, 3,
      160, 16, 181, 133, 19, 59, 42, 249, 213, 155, 187, 32, 198, 125, 3, 50,
    ])
  ),
  dataBufferKeypair: Keypair.fromSecretKey(
    new Uint8Array([
      28, 229, 235, 252, 212, 152, 240, 151, 230, 84, 57, 182, 211, 58, 109,
      232, 52, 111, 127, 47, 165, 186, 139, 73, 33, 156, 253, 250, 172, 188,
      119, 182, 87, 178, 229, 228, 101, 161, 161, 42, 44, 249, 82, 32, 94, 94,
      198, 20, 234, 19, 202, 242, 165, 35, 2, 231, 160, 10, 221, 45, 63, 3, 250,
      119,
    ])
  ),
  queueSize: 10,
  reward: 0,
  minStake: 0,
  oracleTimeout: 900,
  unpermissionedFeeds: true,
  unpermissionedVrf: true,
  enableBufferRelayers: true,
  oracle: {
    name: 'Localnet Oracle',
    stakeAmount: 0,
    enable: true,
    stakingWalletKeypair: Keypair.fromSecretKey(
      new Uint8Array([
        67, 131, 239, 47, 118, 122, 163, 132, 42, 122, 203, 119, 213, 213, 100,
        75, 231, 52, 223, 48, 24, 210, 237, 170, 53, 148, 5, 156, 177, 174, 55,
        104, 150, 48, 4, 175, 217, 217, 90, 71, 189, 153, 51, 139, 210, 112,
        138, 167, 3, 190, 119, 20, 1, 68, 148, 4, 186, 96, 127, 24, 38, 128,
        189, 75,
      ])
    ),
  },
};

export class SwitchboardTestContextV2 {
  dockerOracle?: SolanaDockerOracle;

  constructor(
    readonly network: LoadedSwitchboardNetwork,
    readonly walletPath: string
  ) {}

  get queue(): QueueAccount {
    return this.network.queue.account;
  }

  get program(): SwitchboardProgram {
    return this.queue.program;
  }

  get oracle(): OracleAccount {
    return this.network.oracles[0].account;
  }

  static async load(
    connection: Connection,
    payer = READ_ONLY_KEYPAIR,
    networkInitParams?: SwitchboardTestContextV2Init
  ): Promise<SwitchboardTestContextV2> {
    const program = await SwitchboardProgram.fromConnection(connection);
    const walletPath = findAnchorTomlWallet();
    const wallet = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(walletPath, 'utf-8')))
    );
    if (!payer.publicKey.equals(wallet.publicKey)) {
      throw new Error(`Anchor wallet pubkey mismatch`);
    }

    const networkParams = networkInitParams ?? DEFAULT_LOCALNET_NETWORK;
    try {
      if ('keypair' in networkParams) {
        const queuePubkey = networkParams.keypair!.publicKey;
        const [queueAccount, queue] = await QueueAccount.load(
          program,
          queuePubkey
        );
        if (!queue.authority.equals(wallet.publicKey)) {
          throw new Error(`Anchor wallet pubkey mismatch`);
        }

        const network = await SwitchboardNetwork.fromQueue(queueAccount);
        return new SwitchboardTestContextV2(network, walletPath);
      }
      // eslint-disable-next-line no-empty
    } catch {}

    // only allow creating a single oracle
    // ensure authority matches Anchor.toml wallet so we dont need to worry about transferring oracle funds
    const [network] = await SwitchboardNetwork.create(program, {
      ...DEFAULT_LOCALNET_NETWORK,
      ...networkParams,
      authority: undefined,
      oracles: [
        {
          ...DEFAULT_LOCALNET_NETWORK.oracle,
          ...networkParams.oracle,
          authority: undefined,
        },
      ],
    });
    const loadedNetwork = await network.load();

    if (loadedNetwork.oracles.length !== 1) {
      throw new Error(`Failed to get oracle`);
    }

    for (const oracle of loadedNetwork.oracles) {
      if (!oracle.state.oracleAuthority.equals(wallet.publicKey)) {
        throw new Error(`Anchor wallet pubkey mismatch`);
      }
    }
    return new SwitchboardTestContextV2(loadedNetwork, walletPath);
  }

  static async loadFromProvider(
    provider: AnchorProvider,
    networkInitParams?: SwitchboardTestContextV2Init
  ): Promise<SwitchboardTestContextV2> {
    const payer = (provider.wallet as AnchorWallet).payer;
    const switchboard = await SwitchboardTestContextV2.load(
      provider.connection,
      payer,
      networkInitParams
    );
    return switchboard;
  }

  static async upFromProvider(
    provider: AnchorProvider,
    nodeImage: string,
    networkInitParams?: SwitchboardTestContextV2Init
  ): Promise<SwitchboardTestContextV2> {
    const switchboard = await SwitchboardTestContextV2.loadFromProvider(
      provider,
      networkInitParams
    );
    await switchboard.start(nodeImage);
    return switchboard;
  }

  static async up(
    connection: Connection,
    nodeImage: string,
    payer = READ_ONLY_KEYPAIR,
    networkInitParams?: SwitchboardTestContextV2Init
  ): Promise<SwitchboardTestContextV2> {
    const switchboard = await SwitchboardTestContextV2.load(
      connection,
      payer,
      networkInitParams
    );
    await switchboard.start(nodeImage);
    return switchboard;
  }

  async start(nodeImage: string) {
    this.dockerOracle = new SolanaDockerOracle(
      {
        network: 'localnet',
        rpcUrl: this.program.connection.rpcEndpoint,
        oracleKey: this.oracle.publicKey.toBase58(),
        secretPath: this.walletPath,
        envVariables: {
          VERBOSE: '1',
          DEBUG: '1',
        },
      },
      nodeImage,
      undefined,
      true
    );

    console.log(`Starting Switchboard oracle ...`);

    await this.dockerOracle.startAndAwait();
  }

  stop() {
    if (this.dockerOracle) {
      const stopped = this.dockerOracle.stop();
      if (!stopped) {
        console.error(`Failed to stop docker oracle`);

        // TODO: We can force kill it
      }
    }
  }

  public static findAnchorTomlWallet(workingDir = process.cwd()): string {
    try {
      const walletPath = findAnchorTomlWallet(workingDir);
      return walletPath;
    } catch (error) {
      console.error(error);
    }

    throw new Error(`Failed to find wallet path in Anchor.toml`);
  }
}