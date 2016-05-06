var $tw = require("tiddlywiki").TiddlyWiki();

$tw.boot.argv = [
  process.env.OPENSHIFT_DATA_DIR+fr,
  "--verbose",
  "--server",
  process.env.OPENSHIFT_NODEJS_PORT,
  "$:/core/save/all",
  "text/plain",
  "text/html",
  "<username>",
  "<password>",
  process.env.OPENSHIFT_NODEJS_IP,
];
+$tw.boot.boot();
