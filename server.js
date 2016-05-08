var $tw = require("tiddlywiki").TiddlyWiki();
  var mon_password = process.env.TW_PASSWD;
  var mon_username = process.env.TW_USER;

	if (mon_password === undefined) {
		mon_password = "<password>";
	}
	if (mon_username === undefined) {
		mon_username = "<username>";
	}


$tw.boot.argv = [
  process.env.OPENSHIFT_DATA_DIR,
  "--verbose",
  "--server",
  process.env.OPENSHIFT_NODEJS_PORT,
  "$:/core/save/all",
  "text/plain",
  "text/html",
  mon_username,
  mon_password,
  process.env.OPENSHIFT_NODEJS_IP,
];
+$tw.boot.boot();
