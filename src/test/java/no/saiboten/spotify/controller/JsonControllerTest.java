package no.saiboten.spotify.controller;

import static org.junit.Assert.assertNotNull;
import no.saiboten.spotify.service.PlaylistService;
import no.saiboten.spotify.service.UserIDService;
import no.saiboten.spotify.service.UserService;

import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.web.servlet.ModelAndView;

public class JsonControllerTest {

	JsonController jsonController;

	@Mock
	PlaylistService playlistService;

	@Mock
	UserIDService userIDService;

	@Mock
	UserService userService;

	public JsonControllerTest() {
		MockitoAnnotations.initMocks(this);
		jsonController = new JsonController(playlistService, userService,
				userIDService);
	}

	@Test
	public void test_get_song() {
		Mockito.when(playlistService.getLeadingSongAndResetScore("playlistid"))
				.thenReturn("mysong");
		ModelAndView mav = jsonController.getSong("playlistid");
		assertNotNull(mav.getModel().get("nextSong"));
		Mockito.verify(playlistService, Mockito.times(1))
				.getLeadingSongAndResetScore("playlistid");
	}

}
