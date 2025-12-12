import javax.swing.JFrame;
import javax.swing.JLabel;
import java.util.Date;

public class BannerApp extends JFrame implements Runnable {

  Thread th;
  JLabel label = new JLabel("Java World");
  int x = 10;

  public BannerApp() {
    this.setTitle("Banner Application :)");
    this.setLayout(null);

    label.setBounds(x, 100, 200, 50);
    this.add(label);

    th = new Thread(this);
    th.start();
  }

  public static void main(String[] args) {
    BannerApp app = new BannerApp();
    app.setBounds(50, 50, 600, 400);
    app.setVisible(true);
    app.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  }

  @Override
  public void run() {
    while (true) {
      try {
        x += 10;
        if (x > this.getWidth()) {
          x = -100;
        }
        label.setBounds(x, 100, 200, 50);
        Thread.sleep(100);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }
}
