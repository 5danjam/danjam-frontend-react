import './App.css';
import WishButton from "./components/WishButton";
import DormCard from "./components/DormCard";
import DormList from "./components/DormList";
import TestWishButton from "./testComponents/TestWishButton";
import TestCard from "./testComponents/TestCard"
import TestList from "./testComponents/TestList"
import ReviewList from "./components/Review/ReviewList";
import ReviewWriteButton from "./testComponents/ReviewWriteButton";

function App() {
  return (
    <div className="App">
      <ReviewList dormId={1}/>
        <ReviewWriteButton/>
    </div>
  );
}

export default App;
