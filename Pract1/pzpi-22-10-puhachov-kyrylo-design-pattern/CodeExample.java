// 1. Цільовий інтерфейс (який очікує наша система)
interface Logger {
    void log(String message, String level);
    void error(String message);
}

// 2. Стороння бібліотека (несумісний інтерфейс)
class LegacyLogger {
    public void logToConsole(String text, String severity, String date) {
        System.out.println("[" + date + "][" + severity + "] " + text);
    }
}

// 3. Адаптер (перекладає наш інтерфейс у формат LegacyLogger)
class LoggerAdapter implements Logger {
    private LegacyLogger legacyLogger;
    
    public LoggerAdapter(LegacyLogger legacyLogger) {
        this.legacyLogger = legacyLogger;
    }
    
    @Override
    public void log(String message, String level) {
        legacyLogger.logToConsole(message, level, new Date().toString());
    }
    
    @Override
    public void error(String message) {
        legacyLogger.logToConsole(message, "ERROR", new Date().toString());
    }
}

// 4. Використання
public class Main {
    public static void main(String[] args) {
        LegacyLogger oldLogger = new LegacyLogger();
        Logger logger = new LoggerAdapter(oldLogger);
        
        logger.log("Запуск системи", "INFO");
        logger.error("Помилка з'єднання");
    }
}
