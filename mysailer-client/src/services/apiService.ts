class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async sendMessageByChatId(
    chatId: string,
    message: { user_id: string; type: string; content: string }
  ) {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  async createChat(user_name: string) {
    try {
      const response = await fetch(`${this.baseUrl}/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants: [user_name] }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  async getChats() {
    try {
      const response = await fetch(`${this.baseUrl}/chats`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  }

  async getMessagesByChatId(chatId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/chats/${chatId}/messages`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
}

export default new ApiService("http://localhost:8000");
