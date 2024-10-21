import Image from "next/image";

const StoryCard = () => {
      return (
        <div className="card bg-base-100 w-full sm:w-50 md:w-90 shadow-xl">
          <figure>
            <Image
              src="/Lfa.png"
              alt="Stories"
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Stories!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Read Now</button>
            </div>
          </div>
        </div>
      );
    };
    
    export default StoryCard;
    