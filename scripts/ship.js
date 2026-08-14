import { execSync } from "child_process";
import readline from "readline";

function run(command) {
  console.log(`\n> ${command}`);
  execSync(command, { stdio: "inherit" });
}

try {
  // Check if there are changes
  const status = execSync("git status --porcelain").toString();

  if (!status.trim()) {
    console.log("✅ No changes to commit.");
    process.exit(0);
  }

  // Stage files
  run("git add .");

  // Ask for commit message
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nEnter commit message: ", (message) => {
    if (!message.trim()) {
      console.log("❌ Commit message cannot be empty.");
      rl.close();
      process.exit(1);
    }

    try {
      // Use execSync with string command for simplicity and reliability
      console.log(`\n> git commit -m "${message}"`);
      execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
      run("git push");
      run("npm run deploy");

      console.log("\n🎉 Successfully deployed to GitHub Pages!");
    } catch (err) {
      // Improved error handling
      console.error("\n❌ Ship failed:");
      console.error(err.message);
      process.exit(1);
    }

    rl.close();
  });
} catch (err) {
  console.error(err.message);
}
