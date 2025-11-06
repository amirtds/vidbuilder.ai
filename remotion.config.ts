import { Config } from "@remotion/cli/config";

Config.setImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setCodec("h264");
Config.setCrf(18);
Config.setVideoBitrate("8M");

export {};
