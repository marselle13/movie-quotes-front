import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import api from '@/config/axios'

export default function instantiatePusher() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_BASE_URL}broadcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_KEY,
    forceTLS: false,
    cluster: ['eu'],
    withCredentials: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          api
            .post(
              `${import.meta.env.VITE_BASE_URL}broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              { withCredentials: true },
            )
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error)
            })
        },
      }
    },
  })

  return true
}
