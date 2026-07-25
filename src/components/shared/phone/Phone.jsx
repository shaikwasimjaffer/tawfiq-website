import Frame from "./Frame";
import Screen from "./Screen";
import Reflection from "./Reflection";
import DynamicIsland from "./DynamicIsland";
import SideButtons from "./SideButtons";
import NotificationCard from "./NotificationCard";

export default function Phone({
  screen = "prayer",
  notification = null,
  progress = 0,
  tilt = true,
  reflection = true,
}) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Floating shadow */}
      <div className="absolute h-[620px] w-[320px] rounded-full bg-black/20 blur-3xl" />

      <Frame progress={progress} tilt={tilt}>
        {/* OLED Display */}
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-black">
          {/* Glass Reflection */}
          {reflection && <Reflection progress={progress} />}

          {/* Dynamic Island */}
          <DynamicIsland />

          {/* App Screen */}
          <Screen screen={screen} progress={progress} />

          {/* Notification */}
          {notification && (
            <NotificationCard type={notification} progress={progress} />
          )}
        </div>

        {/* Hardware Buttons */}
        <SideButtons />
      </Frame>
    </div>
  );
}
