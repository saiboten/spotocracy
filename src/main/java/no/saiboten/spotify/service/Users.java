package no.saiboten.spotify.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import no.saiboten.spotify.bean.User;

import org.apache.log4j.Logger;

/**
 * Users for one playlist
 * 
 * @author Tobias
 * 
 */
public class Users {

	private final Logger LOGGER = Logger.getLogger(getClass());

	private Map<String, User> users;

	public Users() {
		users = new HashMap<String, User>();
	}

	public Collection<User> getUsers() {
		return users.values();
	}

	public User getUser(String id) {
		LOGGER.debug("These are the current users: " + users);
		User returnUser = null;
		if (users.get(id) == null) {
			LOGGER.debug("This user doesn't exist. Creating user");
			returnUser = createUser(id);
		} else {
			LOGGER.debug("User exists, returning existing user");
			returnUser = users.get(id);
		}
		return returnUser;
	}

	private User createUser(String id) {
		User newUser = new User();
		newUser.setId(id);
		users.put(id, newUser);
		LOGGER.debug("This is the new user: " + newUser);
		return newUser;
	}

	public void clearSong(String songUri) {
		for (User user : users.values()) {
			LOGGER.debug("clearing vote for user: " + user);
			user.clearVote(songUri);
		}
	}
}
