package no.saiboten.spotify.controller;

import no.saiboten.spotify.service.PlaylistService;
import no.saiboten.spotify.service.UserIDService;
import no.saiboten.spotify.service.UserService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DefaultController {

	private final Logger LOGGER = Logger.getLogger(getClass());

	private PlaylistService playlistService;

	private UserService userService;

	private UserIDService userIDService;

	@Autowired
	public DefaultController(PlaylistService playlistService,
			UserService userService, UserIDService userIDService) {
		this.playlistService = playlistService;
		this.userService = userService;
		this.userIDService = userIDService;
	}

	@RequestMapping("get/{path}")
	public ModelAndView defaultHandler(@PathVariable String path,
			@RequestParam(required = false, value = "m") String m,
			@RequestParam(required = false, value = "angular") String angular) {
		ModelAndView mav = null;
		if (m != null) {
			mav = new ModelAndView("mobile");
		} else if (angular != null) {
			mav = new ModelAndView("angular");
		} else {
			mav = new ModelAndView("index");
		}
		LOGGER.debug("Default controller called");
		if (path != null && !playlistService.playlistExists(path)) {
			playlistService.createPlaylist(path);
		}
		mav.addObject("playlist", path);
		mav.addObject("user",
				userService.getUser(path, userIDService.getUserID()));
		return mav;
	}
}
