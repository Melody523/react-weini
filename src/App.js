import React from 'react';

// 引入react-redux配置
import { Provider } from 'react-redux';
// 引入react-router配置
import router from '@/router/index.jsx';

import store from '@/store/store.js'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
function App() {
  return (
    <div>
      <Provider store={store}>
        {router}
      </Provider>
    </div>
  );
 }
// class App extends Component {
//   // componentWillUpdate () {
//   //   NProgress.start()
//   // }

//   // componentDidUpdate () {
//   //   NProgress.done()
//   // }

//   render () {
//     console.log(this.props)
//     return (
//       <div>
//         <Provider store={store}>
//             {router}
//         </Provider>
//       </div>
//     );
//   }
// }

export default App;
