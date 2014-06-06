package no.saiboten.spotify.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import no.saiboten.spotify.bean.User;

import org.junit.Test;

public class UserServiceTest {

	UserService userService;

	public UserServiceTest() {
		userService = new UserService();
	}

	@Test
	public void test_get_user_creates_new_user() {
		User user = userService.getUser("playlistid", "myuserid");
		assertNotNull(
				"The user should never be null, a new user should be created",
				user);
		user = userService.getUser("playlistid", "myuserid");
		assertNotNull("The user should still not be null", user);

	}

	@Test
	public void testClearSong() {
		User user = userService.getUser("playlistid", "myuser");
		user.vote("mysong");
		assertTrue(user.hasVoted("mysong"));
		userService.clearSong("playlistid", "mysong");
		assertFalse(user.hasVoted("mysong"));
	}

}
