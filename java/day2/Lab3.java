class Lab3 {
    public static void main(String[] args) {
        String ip = "a";

        if (isValidIP(ip)) {
            System.out.println("Valid IP");
            String[] octets = ip.split("\\.");

            System.out.println("Octet 1: " + octets[0]);
            System.out.println("Octet 2: " + octets[1]);
            System.out.println("Octet 3: " + octets[2]);
            System.out.println("Octet 4: " + octets[3]);
        } else {
            System.out.println("Invalid IP");
        }
    }

    public static boolean isValidIP(String ip) {
        String regex =
            "^(25[0-5]|2[0-4]\\d|1?\\d\\d?)\\." +
            "(25[0-5]|2[0-4]\\d|1?\\d\\d?)\\." +
            "(25[0-5]|2[0-4]\\d|1?\\d\\d?)\\." +
            "(25[0-5]|2[0-4]\\d|1?\\d\\d?)$";

        return ip.matches(regex);
    }
}
