function getExternalAssets(mode) {
	if (mode.watch) {
		return `<script src="react/umd/react.development.js"></script>
		<script src="react-dom/umd/react-dom.development.js"></script>

		<link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
		<link href="prismjs/themes/prism.css" rel="stylesheet">`;
	}

	return `<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
		<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>

		<link href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
		<link href="https:/unpkg.com/prismjs@1.29.0/themes/prism.min.css" rel="stylesheet">
		<!-- ${JSON.stringify(mode)} -->
		<!--script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-61247721-1', 'auto');
			ga('send', 'pageview');
		</script-->`;
}

function getDocumentationContent() {
	return `<span id="debug_here">.</span>
		<span id="iconPreload" class="glyphicon glyphicon-arrow-down"></span>
		<div id="chart-goes-here"></div>`;
}

module.exports = function (params) {
	const {
		options: { mode, page },
		files,
	} = params.htmlWebpackPlugin;

	const pageName = page == "index" ? "docs" : page;
	// const chunkPath = files.js.find(f => f.endsWith(`${pageName}.js`));
	const chunkPath = files.js.find(f => f.includes(`-${pageName}.`));

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="description" content="Highly customizable stock charts">
		<meta name="author" content="rrag">
		<!--
			http://www.favicon.cc/?action=icon&file_id=174180 
			License: Creative Commons, no attribution 
		-->
		<link href="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAACAAIAACQAAAoODgAEAAQAAiQCAAwWCgAEJAQADggIAAQSHgAODhAAAA4AAAwIBAAmJCgAABQIACQkJAAmJCYAKCQoAAAcAAAEHAQABhwGAAgcCAAmJCQAACoAAAQGBAAGBgYAFgIAAAAMCAAKKgoABAYCAAA4AAAEFAQAAjgCAAQ4BAAAAhoAHAICABQUFAAAIgAACgwMAAwGBAAEDAQADg4AAA4GBgAGDAYADDAMACQiJAAmIiYAABoAAAoMCAAAPgAABBoEAAg+CAAABAAAAgQCAAAoAAAACggACigKAAwoDAAEBAIAABIAAAA2AAAKKAgAAAAaAAYgCAAaAAAAAA4cAAogDAASEhIABgoKACgoKAAAIAAAChIIAAQgBAAAAggAAgIKABISEAAENgAAAiAAAAAuAAAMBAQABAoEAAAQCAAKCgoAABgAAAoKCAACGAIAADwAAAIGHAAAAgAAAgICAAAmAAAEAgQAAiYCAAoKAgAANAAAChAKACYmJgAGCAoAAB4AAAAACAAADBoAAgAKAAYICAAoJiYACAgKAAgQBAAMAgQAAiwCAAgICAAADggACggKAAA6AgAMAgIABAgCAAIWAgAMEAQAAjoCAAgWCAAMCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ0VgYGBgYGBgYGBgYGBFQ0UkbGxsbGxsbGxsbGwZJEUPREREREREaGFEREREZgNFZyNAQEBAQCkaQEBAQEAjFmAqT09PaidMXXNqDHNwCGAPJlJSUlJCbz8cbl84aApFYDUAAFgAPE5eJQA7HjRZDy5IclpiU2tIIV4BLzw2FBAuBTN0AjF1XzkgFVxGXiwRLgdWYgtGNAAAYhc2U1pVLS4TBRgEE1BbWzIfMihiK2AuTWlUVDBUVFQwRz12EgZFDQkiPj4+Ij4+Pj5kPkFXEGBlY2NJNw5RGxttY2NjSmBFSzo6OnEdcXFxcTo6OktFQ0VgYGBgYBAQEBBgYGBFQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" rel="icon" type="image/x-icon" />
		<title>React Stockcharts - Home</title>
		${getExternalAssets(mode)}

		<style type="text/css">
			.dark {
				background: #303030;
			}
			.light {
				color: #FFFFFF;
			}
		</style>
	</head>
	<body>
		${getDocumentationContent()}

		<!-- Placed at the end of the document so the pages load faster -->
		${!chunkPath ? "" : `<script type="text/javascript" src="${chunkPath}"></script>`}
		
		<!-- ${!mode.watch ? "" : `<script type="text/javascript" src="/webpack-dev-server.js"></script>`} -->

		<script type="text/javascript">
			// console.log(${JSON.stringify(mode)});
			// console.log(${JSON.stringify(page)}, ${JSON.stringify(pageName)});
			// console.log(${JSON.stringify(files)});
			// console.log(${JSON.stringify(params.htmlWebpackPlugin)});
			// console.log(${JSON.stringify(chunkPath)});
		</script>
	</body>
</html>`;
};
