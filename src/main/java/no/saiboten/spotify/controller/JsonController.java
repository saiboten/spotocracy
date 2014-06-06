package no.saiboten.spotify.controller;

import java.util.LinkedList;

import javax.servlet.http.HttpServletRequest;

import no.saiboten.spotify.bean.SongBean;
import no.saiboten.spotify.bean.User;
import no.saiboten.spotify.service.PlaylistService;
import no.saiboten.spotify.service.UserIDService;
import no.saiboten.spotify.service.UserService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

@Controller
public class JsonController {

	private UserService userService;

	private UserIDService userIDService;

	private PlaylistService playlistService;

	private final Logger LOGGER = Logger.getLogger(getClass());

	@Autowired
	public JsonController(PlaylistService playlistService,
			UserService userService, UserIDService userIDService) {
		this.playlistService = playlistService;
		this.userService = userService;
		this.userIDService = userIDService;
	}

	@RequestMapping("get_playing_song/{playlistId}")
	public ModelAndView getPlayingSong(@PathVariable String playlistId) {

		ModelAndView mav = new ModelAndView();
		MappingJacksonJsonView view = new MappingJacksonJsonView();
		mav.setView(view);

		if (!playlistService.playlistExists(playlistId)) {
			mav.addObject("error", "playlist doesn't exist");
			return mav;
		}

		mav.addObject("nextSong", playlistService.getLeadingSong(playlistId));
		return mav;
	}

	@RequestMapping("createplaylist")
	public ModelAndView createPlaylist(@RequestParam String id) {
		ModelAndView mav = new ModelAndView();
		MappingJacksonJsonView view = new MappingJacksonJsonView();
		mav.setView(view);

		if (id == null) {
			mav.addObject("error", "Invalid ID");
			return mav;
		}

		playlistService.createPlaylist(id);
		return mav;
	}

	@RequestMapping("getSong/{playlistId}")
	public ModelAndView getSong(@PathVariable String playlistId) {
		ModelAndView mav = new ModelAndView();
		MappingJacksonJsonView view = new MappingJacksonJsonView();
		mav.setView(view);

		if (!playlistService.playlistExists(playlistId)) {
			mav.addObject("error", "playlist doesn't exist");
			return mav;
		}

		mav.addObject("nextSong",
				playlistService.getLeadingSongAndResetScore(playlistId));
		return mav;
	}

	@RequestMapping("addSongs/{playlistId}")
	public void addSongs(@RequestBody String json,
			@PathVariable String playlistId) {
		LOGGER.debug("Data:" + json);
	}

	@RequestMapping("get_current_songs/{playlistId}")
	public ModelAndView getCurrentSongs(@PathVariable String playlistId) {
		ModelAndView mav = new ModelAndView();
		mav.setView(new MappingJacksonJsonView());

		if (!playlistService.playlistExists(playlistId)) {
			mav.addObject("error", "playlist doesn't exist");
			return mav;
		}

		mav.addObject("songs", playlistService.getSongs(playlistId));
		mav.addObject("userVotes",
				userService.getUser(playlistId, userIDService.getUserID())
						.getAvailableVotes());

		LinkedList<SongBean> songs = playlistService.getSongs(playlistId);
		int totalVotes = 0;
		for (SongBean song : songs) {
			totalVotes += song.getScore();
		}

		mav.addObject("totalVotes", totalVotes);

		SongBean song = playlistService.getPlayingSong(playlistId);
		if (song != null) {
			mav.addObject("playingSong", song);
		}
		return mav;
	}

	@RequestMapping("add/{playlistId}/{uri}")
	public ModelAndView addSong(@PathVariable String playlistId,
			@PathVariable String uri) {
		ModelAndView mav = new ModelAndView();
		mav.setView(new MappingJacksonJsonView());

		if (!playlistService.playlistExists(playlistId)) {
			mav.addObject("error", "playlist doesn't exist");
			return mav;
		}

		mav.addObject("success", playlistService.addSong(playlistId, uri));
		return mav;
	}

	@RequestMapping("boost/{playlistId}/{uri}")
	public ModelAndView boostSong(@PathVariable String playlistId,
			@PathVariable String uri, HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		mav.setView(new MappingJacksonJsonView());

		if (!playlistService.playlistExists(playlistId)) {
			mav.addObject("error", "playlist doesn't exist");
			return mav;
		}

		LOGGER.debug("IP: " + request.getRemoteAddr());
		LOGGER.debug("User Agent: " + request.getHeader("User-Agent"));
		String userId = request.getRemoteAddr()
				+ request.getHeader("User-Agent");

		User user = userService.getUser(playlistId, userId);

		LOGGER.debug("This is the current user: " + user);

		if (user.isOutOfVotes()) {

			LOGGER.debug("Out of votes!");
			mav.addObject("alreadyvoted", "true");
		} else {
			LOGGER.debug("User has not voted for this song! Adding vote.");
			if (playlistService.addPointToSong(playlistId, uri)) {
				mav.addObject("songs", playlistService.getSongs(playlistId));
				user.vote(uri);
			}
		}

		// if (user.isOutOfVotes()) {
		// // if (user.hasVoted(uri)) {
		// LOGGER.debug("User has already voted for this song!");
		// mav.addObject("alreadyvoted", "true");
		// } else {
		// LOGGER.debug("User has not voted for this song! Adding vote.");
		// if (playlistService.addPointToSong(playlistId, uri)) {
		// mav.addObject("songs", playlistService.getSongs(playlistId));
		// user.vote(uri);
		// }
		// }

		return mav;
	}
}
