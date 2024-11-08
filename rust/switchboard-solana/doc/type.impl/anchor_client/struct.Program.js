(function() {var type_impls = {
"switchboard_solana":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Program%3CC%3E\" class=\"impl\"><a href=\"#impl-Program%3CC%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;C&gt; Program&lt;C&gt;<div class=\"where\">where\n    C: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/ops/deref/trait.Deref.html\" title=\"trait core::ops::deref::Deref\">Deref</a>&lt;Target = impl Signer&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.new\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">new</a>(\n    program_id: <a class=\"struct\" href=\"switchboard_solana/prelude/struct.Pubkey.html\" title=\"struct switchboard_solana::prelude::Pubkey\">Pubkey</a>,\n    cfg: Config&lt;C&gt;\n) -&gt; <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Result.html\" title=\"enum switchboard_solana::prelude::Result\">Result</a>&lt;Program&lt;C&gt;, ClientError&gt;</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.account\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">account</a>&lt;T&gt;(&amp;self, address: <a class=\"struct\" href=\"switchboard_solana/prelude/struct.Pubkey.html\" title=\"struct switchboard_solana::prelude::Pubkey\">Pubkey</a>) -&gt; <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Result.html\" title=\"enum switchboard_solana::prelude::Result\">Result</a>&lt;T, ClientError&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"switchboard_solana/prelude/trait.AccountDeserialize.html\" title=\"trait switchboard_solana::prelude::AccountDeserialize\">AccountDeserialize</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns the account at the given address.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.accounts\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">accounts</a>&lt;T&gt;(\n    &amp;self,\n    filters: <a class=\"struct\" href=\"switchboard_solana/prelude/borsh/maybestd/vec/struct.Vec.html\" title=\"struct switchboard_solana::prelude::borsh::maybestd::vec::Vec\">Vec</a>&lt;RpcFilterType&gt;\n) -&gt; <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Result.html\" title=\"enum switchboard_solana::prelude::Result\">Result</a>&lt;<a class=\"struct\" href=\"switchboard_solana/prelude/borsh/maybestd/vec/struct.Vec.html\" title=\"struct switchboard_solana::prelude::borsh::maybestd::vec::Vec\">Vec</a>&lt;(<a class=\"struct\" href=\"switchboard_solana/prelude/struct.Pubkey.html\" title=\"struct switchboard_solana::prelude::Pubkey\">Pubkey</a>, T)&gt;, ClientError&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"switchboard_solana/prelude/trait.AccountDeserialize.html\" title=\"trait switchboard_solana::prelude::AccountDeserialize\">AccountDeserialize</a> + <a class=\"trait\" href=\"switchboard_solana/prelude/trait.Discriminator.html\" title=\"trait switchboard_solana::prelude::Discriminator\">Discriminator</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns all program accounts of the given type matching the given filters</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.accounts_lazy\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">accounts_lazy</a>&lt;T&gt;(\n    &amp;self,\n    filters: <a class=\"struct\" href=\"switchboard_solana/prelude/borsh/maybestd/vec/struct.Vec.html\" title=\"struct switchboard_solana::prelude::borsh::maybestd::vec::Vec\">Vec</a>&lt;RpcFilterType&gt;\n) -&gt; <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Result.html\" title=\"enum switchboard_solana::prelude::Result\">Result</a>&lt;ProgramAccountsIterator&lt;T&gt;, ClientError&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"switchboard_solana/prelude/trait.AccountDeserialize.html\" title=\"trait switchboard_solana::prelude::AccountDeserialize\">AccountDeserialize</a> + <a class=\"trait\" href=\"switchboard_solana/prelude/trait.Discriminator.html\" title=\"trait switchboard_solana::prelude::Discriminator\">Discriminator</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns all program accounts of the given type matching the given filters as an iterator\nDeserialization is executed lazily</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.on\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">on</a>&lt;T&gt;(\n    &amp;self,\n    f: impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(&amp;EventContext, T) + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static\n) -&gt; <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Result.html\" title=\"enum switchboard_solana::prelude::Result\">Result</a>&lt;EventUnsubscriber&lt;'_&gt;, ClientError&gt;<div class=\"where\">where\n    T: Event + <a class=\"trait\" href=\"switchboard_solana/prelude/borsh/trait.BorshDeserialize.html\" title=\"trait switchboard_solana::prelude::borsh::BorshDeserialize\">BorshDeserialize</a>,</div></h4></section></summary><div class=\"docblock\"><p>Subscribe to program logs.</p>\n<p>Returns an [<code>EventUnsubscriber</code>] to unsubscribe and close connection gracefully.</p>\n</div></details></div></details>",0,"switchboard_solana::client::validator::AnchorProgram"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Program%3CC%3E\" class=\"impl\"><a href=\"#impl-Program%3CC%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;C&gt; Program&lt;C&gt;<div class=\"where\">where\n    C: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/ops/deref/trait.Deref.html\" title=\"trait core::ops::deref::Deref\">Deref</a>&lt;Target = impl Signer&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.payer\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">payer</a>(&amp;self) -&gt; <a class=\"struct\" href=\"switchboard_solana/prelude/struct.Pubkey.html\" title=\"struct switchboard_solana::prelude::Pubkey\">Pubkey</a></h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.request\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">request</a>(&amp;self) -&gt; RequestBuilder&lt;'_, C&gt;</h4></section></summary><div class=\"docblock\"><p>Returns a request builder.</p>\n</div></details><section id=\"method.id\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">id</a>(&amp;self) -&gt; <a class=\"struct\" href=\"switchboard_solana/prelude/struct.Pubkey.html\" title=\"struct switchboard_solana::prelude::Pubkey\">Pubkey</a></h4></section><section id=\"method.rpc\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">rpc</a>(&amp;self) -&gt; RpcClient</h4></section><section id=\"method.async_rpc\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">async_rpc</a>(&amp;self) -&gt; RpcClient</h4></section></div></details>",0,"switchboard_solana::client::validator::AnchorProgram"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()