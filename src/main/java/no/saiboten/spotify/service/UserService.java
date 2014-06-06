package no.saiboten.spotify.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import no.saiboten.spotify.bean.User;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private Map<String, Users> users;

	private final Logger LOGGER = Logger.getLogger(getClass());

	public UserService() {
		users = new HashMap<String, Users>();
	}

	public Collection<Users> getAllUsers() {
		return this.users.values();
	}

	public User getUser(String playlistId, String id) {
		if (users.get(playlistId) == null) {
			users.put(playlistId, new Users());
		}

		return users.get(playlistId).getUser(id);
	}

	public void clearSong(String playlistId, String songUri) {
		if (users.get(playlistId) == null) {
			users.put(playlistId, new Users());
		}
		users.get(playlistId).clearSong(songUri);
	}

}