package server;

import java.sql.*;  // JDBC package for database connections, statements, results

public class DBUtil {

    // To our Oracle Database
    public static Connection connect() throws Exception {
        // Load Oracle's JDBC driver class (need to include ojdbc8.jar in our classpath)
        Class.forName("oracle.jdbc.driver.OracleDriver");

        // Connect to our database
        return DriverManager.getConnection(
            "jdbc:oracle:thin:@localhost:1521:xe", // Need to replace with actual DB host, port, and SID/service name
            "username",                            // Replace with our Oracle DB username
            "password"                             // Replace with our Oracle DB password
        );
    }

    // Runs a SQL query and returns the ResultSet
    public static ResultSet query(String sql) throws Exception {
        Connection conn = connect();            // Get a connection
        Statement stmt = conn.createStatement(); // Create a statement
        return stmt.executeQuery(sql);           // Run the query and return results
    }
}
