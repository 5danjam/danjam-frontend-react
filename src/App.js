import './App.css';
import WishButton from "./components/WishButton";
import DormCard from "./components/DormCard";
import DormList from "./components/DormList";
import TestWishButton from "./testComponents/TestWishButton";
import TestCard from "./testComponents/TestCard"
import TestList from "./testComponents/TestList"

function App() {
  return (
    <div className="App">
      <TestWishButton/>
        <TestCard/>
        <TestList/>
    </div>
  );
}

export default App;
