import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.SwingConstants;
import java.util.Date;

public class Main extends JFrame implements Runnable {

  Thread th;
  JLabel timeLabel = new JLabel();

  public Main() {
    this.setTitle("Time & Date Application Thread");
    timeLabel.setHorizontalAlignment(SwingConstants.CENTER);
    timeLabel.setText(new Date().toString());
    this.add(timeLabel);

    th = new Thread(this);
    th.start();
  }

  public static void main(String[] args) {
    Main app = new Main();
    app.setBounds(50, 50, 600, 400);
    app.setVisible(true);
    app.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  }

  @Override
  public void run() {
    while (true) {
      try {
        timeLabel.setText(new Date().toString());
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }
}
