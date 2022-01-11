import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicHome from '../src/components/user/Home';
import PublicViewProduct from '../src/components/user/ViewProduct';
import PublicCart from '../src/components/user/Cart';
import PublicSignup from '../src/components/user/Signup';
import PublicSignupData from '../src/components/user/Signupuserdata';
import PublicLogin from '../src/components/user/Login';
import PublicOrder from '../src/components/user/Order';
import PublicPayment from '../src/components/user/Payment';
import AdminAddProducts from '../src/components/admin/AddProduct';
import AdminPending from '../src/components/admin/Pending';
import AdminWorking from '../src/components/admin/Working';
import AdminAddCategory from '../src/components/admin/AddCategory';
import AdminAddProdImage from '../src/components/admin/AddProductImage';
import AdminEditProduct from '../src/components/admin/EditProduct';
import AdminChanges from '../src/components/admin/AffectChanges';
import AdminViewPendings from '../src/components/admin/ViewPendings';
import AdminViewWorkings from '../src/components/admin/ViewWorking';
import AdminViewReady from '../src/components/admin/ViewReady';
import AdminPrintReady from '../src/components/admin/PrintReady';

function App() {  
  return (
    <Router>
          <Switch>
            <Route path="/" exact component={PublicHome} />
            <Route path="/viewproduct/:ref" exact component={PublicViewProduct} />
            <Route path="/cart" exact component={PublicCart} />
            <Route path="/login" exact component={PublicLogin} />
            <Route path="/signup" exact component={PublicSignup} />
            <Route path="/order" exact component={PublicOrder} />
            <Route path="/payment" exact component={PublicPayment} />
            <Route path="/userdata" exact component={PublicSignupData} />
            <Route path="/addproduct" exact component={AdminAddProducts} />
            <Route path="/addcategory" exact component={AdminAddCategory} />
            <Route path="/addproductimage" exact component={AdminAddProdImage} />
            <Route path="/editproduct" exact component={AdminEditProduct} />
            <Route path="/changes/:ref" exact component={AdminChanges} />
            <Route path="/viewpendings/:ref" exact component={AdminViewPendings} />
            <Route path="/pending" exact component={AdminPending} />
            <Route path="/viewworking/:ref" exact component={AdminViewWorkings} />
            <Route path="/working" exact component={AdminWorking} />
            <Route path="/ready" exact component={AdminViewReady} />
            <Route path="/print/:ref" exact component={AdminPrintReady} />
            
          </Switch>
    </Router>
  );
}

export default App;
