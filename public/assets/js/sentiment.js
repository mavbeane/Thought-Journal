// Put the following in the head of the html page:
// <script type="text/javascript">
// 	url = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyBvLxSFmu2ZgawBOkgaANPAKtjcVUiSidU"
// </script>

data = {"document": {"content": "fuck","type": "PLAIN_TEXT"}}
$.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json"
}).done(function(response) {
	console.log(response)
});