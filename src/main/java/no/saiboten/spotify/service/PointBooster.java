package no.saiboten.spotify.service;

import java.util.Collection;

import no.saiboten.spotify.bean.User;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PointBooster {

	final static Logger LOGGER = Logger.getLogger(PointBooster.class);

	private static final int VOTES_GIVEN_PER_ROUND = 5;

	private UserService userService;

	@Autowired
	public PointBooster(UserService userService) {
		this.userService = userService;

	}

	public void boostPoints() {
		LOGGER.debug("Adding points to all users");
		Collection<Users> listOfUsers = userService.getAllUsers();
		for (Users users : listOfUsers) {
			Collection<User> listOfUser = users.getUsers();
			for (User user : listOfUser) {
				user.setAvailableVote(user.getAvailableVotes()
						+ VOTES_GIVEN_PER_ROUND);
			}
		}
	}
}
