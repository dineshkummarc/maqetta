package maqetta.core.server.orion.command;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.davinci.server.user.IUser;
import org.davinci.server.user.UserException;
import org.maqetta.server.Command;
import org.maqetta.server.ServerManager;

public class RemoveUser extends Command {

    @Override
    public void handleCommand(HttpServletRequest req, HttpServletResponse resp, IUser user) throws IOException {
        String name = req.getParameter("userName");

        try {
            ServerManager.getServerManger().getUserManager().removeUser(name);
            this.responseString = "OK";
            HttpSession session = req.getSession(false);
            if (session != null) {
                if (user != null && user.getUserName().equals(name)) {
                    /*
                     * we deleted a logged-in user. so, log them out
                     */
                    session.invalidate();
                }
            }
        } catch (UserException e) {
            this.responseString = e.getReason();
        }
    }
}