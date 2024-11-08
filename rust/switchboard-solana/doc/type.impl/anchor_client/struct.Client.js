(function() {var type_impls = {
"switchboard_solana":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Client%3CC%3E\" class=\"impl\"><a href=\"#impl-Client%3CC%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;C&gt; Client&lt;C&gt;<div class=\"where\">where\n    C: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.2/core/ops/deref/trait.Deref.html\" title=\"trait core::ops::deref::Deref\">Deref</a>&lt;Target = impl Signer&gt;,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.new\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">new</a>(cluster: <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Cluster.html\" title=\"enum switchboard_solana::prelude::Cluster\">Cluster</a>, payer: C) -&gt; Client&lt;C&gt;</h4></section><section id=\"method.new_with_options\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">new_with_options</a>(\n    cluster: <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Cluster.html\" title=\"enum switchboard_solana::prelude::Cluster\">Cluster</a>,\n    payer: C,\n    options: CommitmentConfig\n) -&gt; Client&lt;C&gt;</h4></section><section id=\"method.program\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">program</a>(&amp;self, program_id: <a class=\"struct\" href=\"switchboard_solana/prelude/struct.Pubkey.html\" title=\"struct switchboard_solana::prelude::Pubkey\">Pubkey</a>) -&gt; <a class=\"enum\" href=\"switchboard_solana/prelude/enum.Result.html\" title=\"enum switchboard_solana::prelude::Result\">Result</a>&lt;Program&lt;C&gt;, ClientError&gt;</h4></section></div></details>",0,"switchboard_solana::client::validator::AnchorClient"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()