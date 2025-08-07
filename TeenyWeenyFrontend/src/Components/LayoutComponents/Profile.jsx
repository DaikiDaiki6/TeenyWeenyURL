import { Link } from "@tanstack/react-router";

export default function Profile() {
  return (
    <div className="flex flex-col items-center">
      <img src="logo_only.svg" alt="profile" className="w-30" />
      <p>Daiki</p>

        <h1>Your Short Urls...</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>Short Url</td>
              <td>Original Url</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>https://twurl.com/daikii</td>
              <td>https://www.youtube.com/watch?v=fri_S6b5Ntc</td>
              <td>
                <Link to="/edit-url">Edit</Link>
                <Link to="/short-urls">Info</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
