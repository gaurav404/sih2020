$(document).ready(function() {
	$('#favorite').on('submit', function(e) {
        e.preventDefault();

		var id = $('#id').val();
		var clubName = $('#clubName').val();

		$.ajax({
			url: '/chat/home',
			type: 'POST',
			data: { id, clubName },
			success: function() {
				console.log(clubName);
			},
		});
	});
});
