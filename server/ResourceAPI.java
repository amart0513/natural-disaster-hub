package server;

import com.sun.net.httpserver.*;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.OutputStream;
import java.sql.ResultSet;

public class ResourceAPI implements HttpHandler {
    public void handle(HttpExchange exchange) {
        try {
            JSONArray resources = new JSONArray();
            ResultSet rs = DBUtil.query("SELECT name, location FROM resources");

            while (rs.next()) {
                JSONObject obj = new JSONObject();          // Make a new JSON object
                obj.put("name", rs.getString("name"));      // Add the name column
                obj.put("location", rs.getString("location"));  // Add the location column
                resources.put(obj);                         // Add this object to the array
            }

            byte[] response = resources.toString().getBytes();

            exchange.getResponseHeaders().add("Content-Type", "application/json");

            exchange.sendResponseHeaders(200, response.length);

            OutputStream os = exchange.getResponseBody();
            os.write(response);
            os.close();
        } catch (Exception e) {
            e.printStackTrace(); // Print error if something goes wrong
        }
    }
}