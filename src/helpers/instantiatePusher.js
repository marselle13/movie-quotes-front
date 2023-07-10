import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import api from '../../../my-first-vue-app/src/config/axios'

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
        authorize: (sockedId, callback) => {
          api
            .post(
              `${import.meta.env.VITE_BASE_URL}broadcasting/auth`,
              {
                sockedId: sockedId,
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
