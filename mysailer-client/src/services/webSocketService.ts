interface EventData {
  event: string;
  data: object;
}

export default class WebSocketService {
  private socket: WebSocket | null = null;

  constructor(private url: string) {}

  connect(
    onEvent: (event: string, data: object) => void,
    onError?: (error: Event) => void,
    onClose?: () => void
  ): void {
    if (this.socket) {
      console.warn("WebSocket is already connected.");
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {};

    this.socket.onmessage = (event) => {
      try {
        const message: EventData = JSON.parse(event.data);
        onEvent(message.event, message.data);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (onError) onError(error);
    };

    this.socket.onclose = () => {
      if (onClose) onClose();
    };
  }

  send(message: object): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("Cannot send message: WebSocket is not open");
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    } else {
      console.warn("WebSocket is not connected.");
    }
  }
}
