import { LogoutOutlined } from "@ant-design/icons";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => {
    chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!chat)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );

  return (
    <div className="chat-feed" style={{ position: "relative" }}>
      <div
        className="chat-title-container"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          marginBottom: "2rem",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => {
            return `${person.person.username}`;
          })}
        </div>
        <div className="log-out" onClick={logOut}>
          <LogoutOutlined title="log out" style={{ height: "100%" }} />
        </div>
      </div>

      <div style={{ height: "100px" }} />

      <div style={{ padding: "4rem 0" }}>{renderMessages()}</div>
      <div
        className="message-form-container"
        style={{ position: "fixed", bottom: "0", left: "0", width: "100%" }}
      >
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
