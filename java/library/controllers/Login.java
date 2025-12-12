package controllers;

import java.util.ArrayList;

import controllers.*;
import models.Client;
import models.ClientDatabase;
import utils.ClientNotFound;

public class Login {
  // HandleClient clientHandler = new HandleClient();
  HandleItems itemHandeler;
  ArrayList<Client> clients;

  Login(HandleItems itemHandeler, ArrayList<Client> clients) {
    this.itemHandeler = itemHandeler;
    this.clients = clients;
  }

  public void login(String email, String password) {

  }
}
