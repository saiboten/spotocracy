package no.saiboten.spotify.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserIDService {

	@Autowired
	HttpServletRequest request;

	public String getUserID() {
		return request.getRemoteAddr() + request.getHeader("User-Agent");
	}
}
