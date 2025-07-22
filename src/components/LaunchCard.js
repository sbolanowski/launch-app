// src/components/LaunchCard.jsx
import React, { useState, useMemo, useCallback } from 'react';
import Countdown from 'react-countdown';
import {
  Card, CardHeader, CardBody, Divider,
  Accordion, AccordionItem,
  Popover, PopoverTrigger, PopoverContent,
  Chip, Link, Image
} from "@nextui-org/react";

import { MdDoneOutline, MdOutlineHighlightOff } from "react-icons/md";
import { RxWidth, RxHeight } from "react-icons/rx";
import { FaClock, FaFlag, FaCheck, FaYoutube, FaXmark } from "react-icons/fa6";

import empty from '../assets/empty.jpg';
import { useCachedData } from '../hooks/useCachedData';

const formatDate = date =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const statusMap = {
  TBC:              { color: 'danger',  icon: <FaClock /> },
  Success:          { color: 'success', icon: <FaCheck /> },
  Go:               { color: 'primary', icon: <FaFlag /> },
  TBD:              { color: 'secondary', icon: <FaClock /> },
  'Partial Failure':{ color: 'danger',  icon: <FaXmark /> },
};

const getStatusData = status =>
  statusMap[status] || { color: 'danger', icon: null };

const LaunchCard = ({ launch }) => {
  // 1) Datos crudos + caché
  const { data: nation }        = useCachedData(`nationImage_${launch.id}`,    launch.launch_service_provider.url);
  const { data: rocketConfig }  = useCachedData(`rocketConfig_${launch.id}`,    launch.rocket.configuration.url);
  const { data: launchInfo }    = useCachedData(`launchInfo_${launch.id}`,     launch.url);

  // 2) Derivados (idéntica lógica que antes)
  const nationImageUrl = useMemo(
    () => nation?.nation_url || "",
    [nation]
  );
  const patch = useMemo(
    () => launchInfo?.mission_patches?.[0]?.image_url || null,
    [launchInfo]
  );
  const launchVideo = useMemo(
    () => launchInfo?.vidURLs?.[0]?.url || "",
    [launchInfo]
  );

  const rocketWidth   = rocketConfig?.diameter              ?? "Not available";
  const rocketHeight  = rocketConfig?.length                ?? "Not available";
  const rocketSuccess = rocketConfig?.successful_launches    ?? "Not available";
  const rocketFail    = rocketConfig?.failed_launches        ?? "Not available";

  const rocketStatus     = launch.status.abbrev;
  const rocketStatusLong = launch.status.name;
  const launchDateUTC    = useMemo(() => new Date(launch.net), [launch.net]);

  // 3) Estados de UI (sin tocar)
  const [imageVisible, setImageVisible]       = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = useCallback(index => {
    if (activeAccordion === index) {
      setImageVisible(true);
      setActiveAccordion(null);
    } else {
      setImageVisible(false);
      setActiveAccordion(index);
    }
  }, [activeAccordion]);

  // 4) Renderer idéntico
  const renderer = useCallback(({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <div></div>;
    return (
      <div className="max-w-xl countdown-container w-min-md">
        <span className='text-md'>T-</span>
        {[
          { v: days,  sub: 'Days' },
          { v: hours, sub: 'Hours' },
          { v: minutes, sub: 'Minutes' },
          { v: seconds, sub: 'Seconds' }
        ].map((o, i) => (
          <React.Fragment key={i}>
            <div className="countdown-item">
              <span className='top text-md'>{o.v}</span>
              <span className='sub'>{o.sub}</span>
            </div>
            {i < 3 && <span className='text-md'>:</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }, []);

  const { color, icon } = getStatusData(rocketStatus);

  return (
    <div className='w-unit-6xl'>
      <Card isBordered className="card-custom">
        <CardHeader className="flex gap-4">
          {nationImageUrl && (
            <Image
              isBlurred
              alt="Nation"
              height={48}
              width={48}
              radius="sm"
              src={nationImageUrl}
              loading="lazy"
              classNames="m-5"
            />
          )}
          <div className="flex flex-col">
            <p className="launchName text-md"> {launch.name} </p>
            <div className="flex flex-row justify-between items-center pt-1">
              <p className="text-small text-default-500">
                {formatDate(launchDateUTC)}
              </p>
              &nbsp;
              {launchVideo && (
                <Link isExternal href={launchVideo}>
                  <Chip clickable radius="sm" color="danger" variant="flat">
                    <span className='chipCustom'>
                      <FaYoutube /> &nbsp; Live
                    </span>
                  </Chip>
                </Link>
              )}
              &nbsp;
              {rocketStatus && (
                <Popover backdrop="blur" placement="bottom" showArrow color="foreground">
                  <PopoverTrigger>
                    <Chip
                      className='cursor-pointer'
                      clickable
                      radius="sm"
                      color={color}
                      variant="flat"
                    >
                      {icon && (
                        <span className='chipCustom'>
                          {icon} &nbsp; {rocketStatus}
                        </span>
                      )}
                    </Chip>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        {rocketStatusLong}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="body-card justify-center items-center max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
            <Image
              src={patch || launch.image || launch.program[0].image_url || empty}
              className={`m-5 ${!imageVisible ? 'reduce-height' : 'increase-height'}`}
              style={{
                objectFit: "contain",
                objectPosition: "center center",
                width: "360px",
                transition: "height 0.3s ease",
              }}
              loading="lazy"
            />
            &nbsp;
            <div className="">
              <Countdown date={launchDateUTC} renderer={renderer} />
            </div>
          </div>

          <div className="column-der max-w-md px-3 py-0 text-small text-default-400 z-10 overflow-hidden">
            <Accordion className="max-w-md dark text-foreground bg-background">
              <AccordionItem
                key="1"
                aria-label="Rocket"
                title="Rocket"
                onPress={() => handleAccordionToggle(1)}
              >
                <div>
                  <div className='Info'>
                    <p className='infoTitle'> Launches </p>
                    <div className='innerInfo'>
                      <p className='infoData'>
                        <MdDoneOutline /> &nbsp; Successful: {rocketSuccess}
                      </p>
                      <p className='infoData'>
                        <MdOutlineHighlightOff /> &nbsp; Failed: {rocketFail}
                      </p>
                    </div>
                  </div>
                  <Divider />
                  <div className='Info'>
                    <p className='infoTitle'> Size </p>
                    <div className='innerInfo'>
                      <p className='infoData'>
                        <RxWidth /> &nbsp; Diameter: {rocketWidth}m
                      </p>
                      <p className='infoData'>
                        <RxHeight /> &nbsp; Length: {rocketHeight}m
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="Mission"
                title="Mission"
                onPress={() => handleAccordionToggle(2)}
              >
                <p>{launch.mission.description}</p>
              </AccordionItem>
            </Accordion>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(LaunchCard);
