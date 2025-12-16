import React, { useState } from 'react';
import { BiStar } from 'react-icons/bi'

const ReviewsForm = ({postReviews, id}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [remark, setRemark] = useState("")


  function handleSubmit(e){
    e.preventDefault();
    const reviewsFormData = {
      ratings: rating,
      comments: comment,
      user_id: localStorage.getItem("userID"),
      recipe_id: id
    }

    postReviews(reviewsFormData)
  }


  const handleStarClick = (star) => {
    setRating(star);
    switch (star) {
        case 1:
          setRemark("Coudn't eat it!");
          break;
        case 2:
          setRemark("Didn't like it!");
          break;
        case 3:
          setRemark("Fair enough");
          break;
        case 4:
          setRemark("Liked it!");
          break;
        case 5:
          setRemark("Loved it!");
          break;
        default:
          setRemark("");
      }
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center  justify-center border border-black px-12 py-8 mx-auto mt-4'>
        <h3 className=' '>Your ratings</h3>
        <div className='flex items-center '>
            <div className='text-start p-6 flex flex-row'>
            {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{
                cursor: 'pointer',
                color: star <= rating ? 'red' : 'gray'
                }}
            >
            <BiStar size={32}/>
            </span>
            ))}
          </div>
          <p className='border-l border-black p-1'>{remark}</p>
        </div>

      <div className='flex flex-col'>
        <label htmlFor="Comment" className='text-start'>Comment:</label>
        <textarea
          id="Comment"
          value={comment}
          onChange={handleCommentChange}
          rows={4}
          cols={50}
          className='bg-gray-50 border border-gray-300
          text-gray-900 sm:text-sm
          focus:ring-primary-600 p-2 outline-none'
          required
        />
      </div>
      <div className="flex flex-row items-center gap-3 justify-end mt-4">
          <button type="submit"
          className="border border-black p-2 bg-green-100 rounded-lg hover:bg-green-800 ">Submit</button>
        </div>
    </form>
  );
};

export default ReviewsForm;
