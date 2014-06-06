package no.saiboten.spotify.service.integrationtest;

import no.saiboten.spotify.service.PlaylistService;
import no.saiboten.spotify.service.SpotifySongRestService;
import no.saiboten.spotify.service.UserService;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

@ContextConfiguration("classpath:spotify-test-context.xml")
public class PlaylistServiceIntegrationTest extends
		AbstractJUnit4SpringContextTests {

	@Autowired
	private SpotifySongRestService spotifySongRestService;

	@Autowired
	private UserService userService;

	PlaylistService playlistService;

	@Before
	public void setup() {
		playlistService = new PlaylistService(userService,
				spotifySongRestService);
	}

	@Test
	public void test_rest() {
		String playlistid = playlistService.createPlaylist("id");
		playlistService.addSong("id", "spotify:track:3YVwGFmSc1ycqsk6qLNAK3");
	}
}
