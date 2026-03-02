# CMS Guide — Superteam Academy

## Overview

Course content in Superteam Academy is designed to be driven by a headless CMS (Sanity or Strapi). Currently, the app uses **mock data** in `src/mock/courses.ts` which mirrors the expected CMS schema.

## Content Schema

### Course
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique course identifier |
| slug | string | URL-friendly identifier |
| title | string | Display title |
| description | string | Short description |
| difficulty | 1 \| 2 \| 3 | Beginner/Intermediate/Advanced |
| durationHours | number | Estimated total hours |
| trackId | number | Track/collection ID |
| xpPerLesson | number | XP awarded per lesson completion |
| instructor | string | Instructor name |
| modules | Module[] | Ordered list of modules |

### Module
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique module identifier |
| title | string | Module title |
| lessons | Lesson[] | Ordered list of lessons |

### Lesson
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique lesson identifier |
| title | string | Lesson title |
| durationMinutes | number | Estimated duration |
| isChallenge | boolean | If true, shows code editor |
| content | string? | Markdown content |
| starterCode | string? | Code challenge starter |
| solution | string? | Code challenge solution |
| hint | string? | Optional hint |

## Adding a Course

1. Add the course object to `mockCourses` array in `src/mock/courses.ts`
2. Follow the schema above
3. For challenges, provide `starterCode` and `solution`
4. The course will automatically appear in the catalog

## Migrating to a Real CMS

1. Set up Sanity/Strapi with the schema above
2. Create a `CMSService` that fetches from the CMS API
3. Replace `mockCourses` imports with `CMSService.getCourses()`
4. Update `findCourseBySlug` to use the CMS query
