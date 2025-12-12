package controllers;

import java.util.ArrayList;

import controllers.*;
import models.Client;
import models.ClientDatabase;
import utils.ClientNotFound;
import utils.ClientAlreadyExist;

public class Login {
  // HandleClient clientHandler = new HandleClient();
  HandleItems itemHandeler;
  ArrayList<Client> clients;

  public Login(HandleItems itemHandeler, ArrayList<Client> clients) {
    this.itemHandeler = itemHandeler;
    this.clients = clients;
  }

  public HandleClient login(String email, String password) {
    Client found = null;
    for (Client c : clients) {
      if (c.getEmail().equals(email)) {
        found = c;
        break;
      }
    }
    if (found != null && found.getPassword().equals(password)) {
      return new HandleClient(found, itemHandeler);
    }
    return null;
  }

  public void register(Client client) throws ClientAlreadyExist {
    // HandleClient handleClient = new HandleClient(null, itemHandeler);
    for (Client current : clients) {
      if (current.getEmail().equals(client.getEmail())) {
        throw new ClientAlreadyExist("this client Already Exist!!");
      }
    }
    ClientDatabase.getClients().add(client);
  }

  public void register(String name, String email, String password) throws ClientAlreadyExist {
    // HandleClient handleClient = new HandleClient(null, itemHandeler);
    for (Client client : clients) {
      if (client.getEmail().equals(email)) {
        throw new ClientAlreadyExist("this client Already Exist!!");
      }
    }
    Client newClient = new Client(name, email, password);
    ClientDatabase.getClients().add(newClient);
  }
}
