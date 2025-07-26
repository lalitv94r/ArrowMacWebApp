import { BlogTimelineTitle, ImplementedTheProgramForWeeklyCodeChallenges } from '@/Constant';

const BlogTimeline = () => {
    const BlogTextTime = "help you build problem-solving skills, better understand the programming. ";
  
    return (
      <div className="cd-timeline-block">
        <div className="cd-timeline-img bg-danger">
          <i className="icon-youtube" />
        </div>
        <div className="cd-timeline-content">
          <div className="timeline-wrapper">
            <div className="badge bg-danger">{BlogTimelineTitle}</div>
          </div>
          <h5 className="f-w-500 m-0">{ImplementedTheProgramForWeeklyCodeChallenges}</h5>
          <p className="mb-0">
            Challenges <em className="txt-danger">{BlogTextTime}</em>
          </p>
          <div className="ratio ratio-21x9 m-t-20">
            <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowFullScreen />
          </div>
          <span className="cd-date">March 12 2022</span>
        </div>
      </div>
    );
}

export default BlogTimeline