/**
 * Publisher lookup helpers used by static pages to read the publisher catalog.
 * Keeping this data access in one place makes the site queries consistent and easier to test.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';

/**
 * A compact summary of a publisher returned by the database layer.
 */
export type PublisherSummary = {
    id: number;
    name: string;
};

/**
 * Returns every publisher ordered alphabetically by name.
 *
 * @param db - The injected database client used to query publisher rows.
 * @returns A list of publisher summaries sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<PublisherSummary[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
