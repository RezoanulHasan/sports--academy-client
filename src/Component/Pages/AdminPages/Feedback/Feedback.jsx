import { useLoaderData, useNavigate } from 'react-router-dom';
import useTitle from '../../../../hooks/useTitle';
import Swal from 'sweetalert2';


const Feedback = () => {
  useTitle('Feedback');
  const Class = useLoaderData();

  
  const { className , category } =  Class ;

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className ? form.className.value : '';
    const talk = form.talk ? form.talk.value : '';
    const category = form.category ? form.category.value : '';

    const feedback = {
      className,
      category,
      talk,
    };

    console.log(feedback);

    fetch('https://sports-academy-two.vercel.app/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Booking Successful',
            icon: 'success',
            confirmButtonText: 'CLOSE',
          });
        }
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show an error message to the user
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
          confirmButtonText: 'CLOSE',
        });
      });
  };
  
  return (
    <div>
      <form
        className="bg-emerald-500 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="className">
            Course Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="className"
            placeholder="Course Name"
    defaultValue={className}
    readOnly
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="category"
            placeholder="Category"
            required
            defaultValue={category }
           readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="talk">
            Send Feedback
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            name="talk"
            placeholder="Send Feedback"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Feedback
          </button>
        </div>
      </form>
      <div className="text-center">
        <button
          onClick={back}
          className="btn bg-black text-pink-400 mb-10 mt-4 center btn-lg text-center hover:bg-primary-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Feedback;
