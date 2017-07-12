package com.besafx.app.controller;
import com.besafx.app.entity.Company;
import com.besafx.app.entity.Person;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PartialController {

    private final static Logger log = LoggerFactory.getLogger(PartialController.class);

    @Autowired
    private SessionRegistry sessionRegistry;

    @Autowired
    private PersonService personService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView navToHome(Principal principal) {
        if (principal.getName().equals("anonymousUser")) {
            return new ModelAndView("redirect:/login");
        } else {
            ModelAndView modelAndView = new ModelAndView("index");
            Person person = personService.findByEmail(principal.getName());
            Options options = JSONConverter.toObject(person.getOptions(), Options.class);
            if(options.getLang().equals("AR")){
                modelAndView.addObject("title", "طيف العربية | إدارة المهام");
            }else{
                modelAndView.addObject("title", "Tafear | Task Management");
            }
            return modelAndView;
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String navToLogin() {
        return "login";
    }

    @RequestMapping(value = "/getAllLoggedUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<String> getLoggedUsers() {
        return sessionRegistry.getAllPrincipals().stream()
                .filter(u -> !sessionRegistry.getAllSessions(u, false).isEmpty())
                .map(Object::toString)
                .collect(Collectors.toList());
    }

    @RequestMapping(value = {
            "/login",
            "/home",
            "/menu",
            "/company",
            "/region",
            "/branch",
            "/department",
            "/employee",
            "/team",
            "/person",
            "/task",
            "/reportModel",
            "/help",
            "/profile",
            "/about"
    })
    public ModelAndView navToView() {
        return new ModelAndView("forward:/");
    }
}
