package server;

// imports built-in server
import com.sun.net.httpserver.HttpServer;
// creates socket address
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws Exception {
        // creates server listening on 8000 with a backlog of 0
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        //registers an endpoint
        server.createContext("/api/resources", new ResourceAPI());
        server.setExecutor(null);
        server.start();
        //test
        System.out.println("Server running on http://localhost:8000");
    }
}