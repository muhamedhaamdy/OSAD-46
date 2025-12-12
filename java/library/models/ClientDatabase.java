package models;

import java.util.ArrayList;
import models.Client;

public class ClientDatabase {
  private static ArrayList<Client> clients = new ArrayList<>();

  public static ArrayList<Client> getClients() {
    return clients;
  }
}
