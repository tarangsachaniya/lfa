import Image from "next/image";

const StoryCard = ({ story }) => {
  // Function to escape HTML characters
  const escapeHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="card bg-base-100 w-full sm:w-50 md:w-90 shadow-xl">
      <figure>
        <Image
          src={story.image}
          alt={story.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{story.title}</h2>
        <p>{escapeHtml(story.content.slice(0, 100))}...</p> {/* Escape HTML characters */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read Now</button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
