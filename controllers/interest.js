module.exports = function(async, ChatUsers, Message, FriendResult) {
	return {
		setRouting: function(router) {
			router.get('/chat/settings/interests', this.getInterestPage);
			router.post('/chat/settings/interests', this.postInterestPage);
		},
		getInterestPage: function(req, res) {
			if(req.user==null){
				res.redirect('/login');
			}else{
			async.parallel(
				[
					function(callback) {
						ChatUsers.findOne({ username: req.user.username })
							.populate('request.userId')
							.exec((err, result) => {
								callback(err, result);
							});
					},
					function(callback) {
						const nameRegex = new RegExp(`^${req.user.username.toLowerCase()}`, 'i');

						Message.aggregate(
							[{
								$match: {
									$or: [{ senderName: nameRegex }, { receiverName: nameRegex }],
								},
							},
							{ $sort: { createdAt: -1 } },
							{
								$group: {
									_id: {
										last_message_between: {
											$cond: [
												{
													$gt: [
														{
															$substr: ['$senderName', 0, 1],
														},
														{
															$substr: ['$receiverName', 0, 1],
														},
													],
												},
												{
													$concat: ['$senderName', ' and ', '$receiverName'],
												},
												{
													$concat: ['$receiverName', ' and ', 'sendername'],
												},
											],
										},
									},
									body: { $first: '$$ROOT' },
								},
							}],
							function(err, newResult) {
								const arr = [
									{ path: 'body.sender', model: 'ChatUser' },
									{ path: 'body.receiver', model: 'ChatUser' },
								];

								Message.populate(newResult, arr, (err, newResult) => callback(err, newResult));
							},
						);
					},
				],
				(err, results) => {
					const result1 = results[0];
					const result2 = results[1];

					res.render('user/interest', {
						title: 'Interest',
						user: req.user,
						data: result1,
						chat: result2,
					});
				},
			);
			}
		},
		postInterestPage: function(req, res) {
			FriendResult.PostRequest(req, res, `/chat/settings/profile`);
			console.log('post interest')
			async.parallel(
				[
					function(callback) {
						if (req.body.favClub) {
							ChatUsers.update(
								{ _id: req.user._id, 'favClub.clubName': { $ne: req.body.favClub } },
								{
									$push: { favClub: { clubName: req.body.favClub } },
								},
								(err, result) => callback(err, result),
							);
						}
					},
				],
				(err, results) => {
					res.redirect('/chat/settings/interests');
				},
			);

			async.parallel(
				[
					function(callback) {
						if (req.body.favPlayer) {
							ChatUsers.update(
								{ _id: req.user._id, 'favPlayer.playerName': { $ne: req.body.favPlayer } },
								{
									$push: { favPlayer: { playerName: req.body.favPlayer } },
								},
								(err, result) => callback(err, result),
							);
						}
					},
				],
				(err, results) => {
					res.redirect('/chat/settings/interests');
				},
			);

			async.parallel(
				[
					function(callback) {
						if (req.body.nationalTeam) {
							ChatUsers.update(
								{ _id: req.user._id, 'favNationalTeam.teamName': { $ne: req.body.nationalTeam } },
								{
									$push: { favNationalTeam: { teamName: req.body.nationalTeam } },
								},
								(err, result) => callback(err, result),
							);
						}
					},
				],
				(err, results) => {
					res.redirect('/chat/settings/interests');
				},
			);
		},
	};
};
