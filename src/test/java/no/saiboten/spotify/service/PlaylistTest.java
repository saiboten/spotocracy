package no.saiboten.spotify.service;

import static org.junit.Assert.assertEquals;
import no.saiboten.spotify.bean.SongBean;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class PlaylistTest {

	@Mock
	private UserService userService;

	@Mock
	SpotifySongRestService spotifySongRestService;

	private Playlist playlistService;

	@Before
	public void createPlaylistService() throws Exception {
		playlistService = new Playlist(userService, spotifySongRestService,
				"playlistId");

		Mockito.when(spotifySongRestService.getSongFromUri("song1"))
				.thenReturn(getSongBeanDummy("song1"));

		Mockito.when(spotifySongRestService.getSongFromUri("song2"))
				.thenReturn(getSongBeanDummy("song2"));

		Mockito.when(spotifySongRestService.getSongFromUri("song3"))
				.thenReturn(getSongBeanDummy("song3"));
	}

	@Test
	public void add_point_to_song_bubbles_the_song_to_correct_position() {

		playlistService.addSong("song1");
		playlistService.addSong("song2");

		playlistService.addPointToSong("song2");

		for (SongBean song : playlistService.getSongs()) {
			System.out.println(song.getUri() + " " + song.getScore());
		}

		assertEquals("Song 2 should lead", "song2", playlistService.getSongs()
				.get(0).getUri());

		assertEquals("Song 1 should be last", "song1", playlistService
				.getSongs().get(1).getUri());

	}

	@Test
	public void add_point_to_song_bubbles_the_song_to_correct_position_test2() {

		playlistService.addSong("song1");
		playlistService.addSong("song2");
		playlistService.addSong("song3");

		playlistService.addPointToSong("song2");
		playlistService.addPointToSong("song1");
		playlistService.addPointToSong("song2");

		System.out.println("#1: ");

		for (SongBean song : playlistService.getSongs()) {
			System.out.println(song.getUri() + " " + song.getScore());
		}

		playlistService.addPointToSong("song3");
		playlistService.addPointToSong("song3");

		System.out.println("#2: ");

		for (SongBean song : playlistService.getSongs()) {
			System.out.println(song.getUri() + " " + song.getScore());
		}

		playlistService.addPointToSong("song3");

		System.out.println("#3: ");

		for (SongBean song : playlistService.getSongs()) {
			System.out.println(song.getUri() + " " + song.getScore());
		}

		// assertEquals("Song 2 should lead", "song2",
		// playlistService.getSongs()
		// .get(0).getUri());

		// assertEquals("Song 1 should be last", "song1", playlistService
		// .getSongs().get(1).getUri());

	}

	public SongBean getSongBeanDummy(String uri) {
		SongBean songBean = new SongBean();
		songBean.setUri(uri);
		songBean.setAlbum("album");
		songBean.setArtist("artist");
		songBean.setScore(0);
		songBean.setSong("song");
		return songBean;
	}

}
