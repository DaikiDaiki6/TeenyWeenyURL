import {Link} from "@tanstack/react-router"

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h1>Welcome to Teeny-Weeny URL!</h1>
        <p>The Website for shortening the URLS you have idk man</p>
      </div>
      <div>
        <h1>Your Short Urls...</h1>
        <table>
          <thead>
            <tr>
              <td>Short Url</td>
              <td>Original Url</td>
            </tr>
          </thead>
          <tbody>
            <tr>
                
                <td>
                    <a href="https://twurl.com/daikii">https://twurl.com/daikii</a>
                </td>
                <td>
                    <a href="https://www.youtube.com/watch?v=fri_S6b5Ntc">https://www.youtube.com/watch?v=fri_S6b5Ntc</a>
                </td>
                <td>
                    <Link to="/short-urls">
                    Edit
                    </Link>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
