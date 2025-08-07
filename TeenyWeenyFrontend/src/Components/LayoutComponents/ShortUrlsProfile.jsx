export default function ShortUrlsProfile() {
  return (
    <div className="flex flex-col items-center">
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Daiki</td>
          </tr>
          <tr>
            <td>Short Url</td>
            <td>
              <a href="https://twurl.com/daikii">https://twurl.com/daikii</a>
            </td>
          </tr>
          <tr>
            <td>Original Url</td>
            <td>
              <a href="https://www.youtube.com/watch?v=sAW_0KZqmmc">
                https://www.youtube.com/watch?v=sAW_0KZqmmc
              </a>
            </td>
          </tr>
          <tr>
            <td>Clicks</td>
            <td>255</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>May 6, 2003</td>
          </tr>
          <tr>
            <td>Note (Optional)</td>
            <td>This is the Short url for a video that I like watching!</td>
          </tr>
        </tbody>
      </table>

      <div className="flex space-x-4">
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
}
