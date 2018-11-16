/*using Microsoft.AspNetCore.SignalR;

namespace AspNetCoreSignalR_React.Server
{
    public class ChatHub : Hub
    {
        public void SendToAll(string name, string message)
        {
            Clients.All.InvokeAsync("sendToAll", name, message);
        }
    }
}*/

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {

        private readonly ILogger _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            _logger = logger;
        }

        public async Task SendToAll(string name, string message)
        {
            /*
            var username = Context.User.Identity.Name;
            var chatMessage =  _chatService.CreateNewMessage(username, message);
            // Call the MessageAdded method to update clients.
            Clients.All.InvokeAsync("MessageAdded", chatMessage);
            */
            string connectionID = Context.ConnectionId;
            _logger.LogInformation($@"name:{name} message:{message} connectionID:{connectionID}");

            
            //Clients.All.InvokeAsync("sendToAll", name, message);
            await Clients.All.SendAsync("sendToAll", name, message);
        }        

        /*
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage");
            //await Clients.All.SendAsync("ReceiveMessage", user, message);
            //Clients.All.InvokeAsync("sendToAll", user, message);
        }
        */
    }
}